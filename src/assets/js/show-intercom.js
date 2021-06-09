function showIntercom() {
    var show_chat = false;
    var query = window.location.search.substring( 1 );
    var vars = query.split( '&' );
    for( var i = 0; i < vars.length; i++ ) {
        var pair = vars[ i ].split( '=' );
        if( decodeURIComponent( pair[ 0 ] ) === 'chat' ) {
            show_chat = true;
            break;
        }
    }
    if( !show_chat ) return;
    if( !window.Intercom ) {
        console.log( 'no intercom' );
        setTimeout( showIntercom, 500 );
    }
    window.Intercom( 'show' );
}

showIntercom();
