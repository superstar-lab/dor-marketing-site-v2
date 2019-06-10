var gulp = require( 'gulp' );
var child = require( 'child_process' );
var clean_css = require( 'gulp-clean-css' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rename = require( 'gulp-rename' );
var size = require( 'gulp-filesize' );
var concat = require( 'gulp-concat' );
var browser_sync = require( 'browser-sync' ).create( 'jekyll' );
var uglify = require( 'gulp-uglify' );
var babel = require( 'gulp-babel' );
var RevAll = require( 'gulp-rev-all' );
var log = require( 'fancy-log' );
var awspublish = require( 'gulp-awspublish' );
var cloudfront_invalidate = require( 'gulp-cloudfront-invalidate' );

var paths = {
    css: {
        src: 'src/assets/css/*.scss',
        dest: '_dist/assets/css'
    },
    scss: {
        src: 'src/_sass'
    },
    js: {
        src: 'src/assets/js/*.js',
        dest: '_dist/assets/js'
    },
    vendor: {
        src: 'src/assets/vendor',
        dest: '_dist/assets/vendor'
    }
}

var buildJekyll = ( env, cb ) => {
    var config_file = env === 'development' ? '_config.yml' : `_config.${ env }.yml`;

    var jekyll_options = [ 'build', '--config', config_file ];

    if( env === 'development' ) {
        jekyll_options.push( '--watch' );
    }

    var jekyll = child.spawn( 'jekyll', jekyll_options );

    var jekyll_logger = ( buffer ) => {
        buffer.toString()
            .split( /\n/ )
            .forEach( ( message ) => log( 'Jekyll: ' + message ) );
    };

    jekyll.stdout.on( 'data', jekyll_logger );
    jekyll.stderr.on( 'data', jekyll_logger );
    jekyll.stdout.on( 'close', () => {
        cb();
    } );

    if( env === 'development' ) {
        cb();
    }
}

gulp.task( 'build:development', ( done ) => {
    return buildJekyll( 'development', done );
} );

gulp.task( 'build:staging', ( done ) => {
    return buildJekyll( 'staging', done );
} );

gulp.task( 'build:production', ( done ) => {
    return buildJekyll( 'production', done );
} );

gulp.task( 'jekyll:serve', ( done ) => {
    var jekyll = child.spawn( 'jekyll', [
        'serve'
    ] );

    done();
} );

gulp.task( 'build:css', ( done ) => {
    gulp.src( [ paths.css.src, paths.vendor.src + '/*.css' ] )
        .pipe( sass( {
            style: 'compressed',
            trace: true,
            includePaths: paths.scss.src // tell Sass where to look for the files
        } ).on( 'error', sass.logError ) )
        .pipe( concat( 'all.css' ) )
        .pipe( autoprefixer( {
            browsers: [ 'last 2 versions' ]
        } ) )
        .pipe( clean_css() )
        .pipe( rename( { basename: 'main', extname: '.min.css' } ) )
        .pipe( size() )
        .pipe( gulp.dest( paths.css.dest ) )
        .on( 'end', () => done() );
} );

gulp.task( 'build:js-src', ( done ) => {
    gulp.src( paths.js.src )
        .pipe( concat( 'main.js' ) )
        .pipe( babel( {
            presets: [ 'es2015' ]
        } ) )
        .pipe( uglify() )
        .pipe( rename( { extname: '.min.js' } ) )
        .pipe( size() )
        .pipe( gulp.dest( paths.js.dest ) )
        .on( 'end', () => done() );
} );

gulp.task('build:js-vendor', done => {
    gulp.src(paths.vendor.src + '/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(paths.vendor.dest))
        .on('end', () => done());
});

gulp.task( 'build:js', gulp.series( 'build:js-src' ) );

gulp.task( 'build:assets', gulp.parallel( 'build:css', 'build:js', 'build:js-vendor' ) );

gulp.task( 'build-all:staging', gulp.series( 'build:staging', 'build:assets' ) );
gulp.task( 'build-all:production', gulp.series( 'build:production', 'build:assets' ) );

gulp.task( 'watch:assets', ( done ) => {
    gulp.watch( paths.scss.src, gulp.series( 'build:css' ) );
    gulp.watch( paths.js.src, gulp.series( 'build:js' ) );

    done();
} );

// default task for development
gulp.task( 'default', gulp.series( 'build:development', 'jekyll:serve', 'build:assets', 'watch:assets' ) );

var aws_cloudfront_invalidate_staging = {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    staging_bucket: process.env.AWS_S3_BUCKET_NAME_STAGING,
    distributionId: process.env.AWS_CLOUDFRONT_DIST_ID_STAGING,
    paths: [
        '/*'
    ]
};

// STAGING - PUBLISH TO S3
gulp.task( 'publish:staging', ( done ) => {

    var publisher = awspublish.create( {
        params: {
            Bucket: aws_cloudfront_invalidate_staging.staging_bucket
        },
        accessKeyId: aws_cloudfront_invalidate_staging.accessKeyId,
        secretAccessKey: aws_cloudfront_invalidate_staging.secretAccessKey,
        region: 'us-west-2'
    } );

    return gulp
        .src( '_dist/**/!(feed.xml)*' )
        .pipe( RevAll.revision( {
            dontSearchFile: [ /.*\.pdf/g ],
            dontGlobal: [],
            dontRenameFile: [ /.*\.html$/g, /^\/favicon.ico$/g, /.*\/images\/meta\/.*/g ],
            dontUpdateReference: [ /^.*\.html$/g, /^\/favicon.ico$/g ]
        } ) )
        .pipe( awspublish.gzip() )
        .pipe( publisher.publish() )
        .pipe( publisher.cache() )
        .pipe( awspublish.reporter() )
        .pipe( cloudfront_invalidate( aws_cloudfront_invalidate_staging ) )
        .on( 'end', () => {
            log( 'Published to S3' );
            done();
        });
} );

gulp.task( 'deploy:staging', gulp.series( 'build-all:staging', 'publish:staging' ) );

var aws_cloudfront_invalidate = {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    distribution: process.env.AWS_CLOUDFRONT_DIST_ID,
    paths: [
        '/*'
    ]
};

// PRODUCTION - PUBLISH TO S3 AND INVALIDATE CLOUDFRONT
gulp.task( 'publish:production', ( done ) => {
    var publisher = awspublish.create( {
        params: {
            Bucket: aws.bucket
        },
        accessKeyId: aws.key,
        secretAccessKey: aws.secret
    } );

    return gulp
        .src( '_dist/**/!(feed.xml)*' )
        .pipe( RevAll.revision( {
            dontSearchFile: [ /.*\.pdf/g ],
            dontGlobal: [],
            dontRenameFile: [ /.*\.html$/g, /^\/favicon.ico$/g, /.*\/images\/meta\/.*/g ],
            dontUpdateReference: [ /^.*\.html$/g, /^\/favicon.ico$/g ]
        } ) )
        .pipe( awspublish.gzip() )
        .pipe( publisher.publish() )
        .pipe( publisher.cache() )
        .pipe( awspublish.reporter() )
        .pipe( cloudfront_invalidate( aws_cloudfront_invalidate ) )
        .on( 'end', () => {
            log( 'Published to S3' );
            done();
        });
} );

gulp.task( 'deploy:production', gulp.series( 'build-all:production', 'publish:production' ) );
