$( function() {
    var getCookieValue = function (name) {
        var value_arr = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return (value_arr && value_arr.length) ? value_arr.pop() : '';
    };

    var hashEmail = function( email = '') {
      return new Hashes.SHA256().hex(email.trim().toLowerCase());
    };

    var hashOrderId = function( email = '' ) {
        const sha_hash = new Hashes.SHA256().hex( 'order_id: ' + email.trim().toLowerCase() );
        return new Hashes.MD5().hex( sha_hash );
    };

    var cjSendLead = function(data) {
        data = data || {};

        var defaults = {
           enterpriseId: '1563474',
           actionTrackerId: '428712'
        };

        var order = {
            enterpriseId: data.enterpriseId || defaults.enterpriseId,
            actionTrackerId: data.actionTrackerId || defaults.actionTrackerId,
            currency: 'USD',
            pageType: 'conversionConfirmation',
            amount: 0,
            discount: 0,
            emailHash: data.email ? hashEmail( data.email ) : undefined,
            orderId: data.email ? hashOrderId( data.email ) : undefined,
            // Server side cookie set via Cloudwatch - only on staging/production envs
            cjeventOrder: getCookieValue('cje')
        };

        if( window.cjApi ) {
            return window.cjApi.sendOrder(order);
        }
    };

    $('form.fsForm .fsSubmitButton').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var form = $(this).closest('form.fsForm');
        var email = form.find('input[type="email"]').first().val();

        cjSendLead( {
            email
        } );
    });
} );
