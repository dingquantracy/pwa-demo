if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
        console.log('Registered events at scope: ', registration.scope);
    });
}

window.addEventListener('offline', function(){
    Notification.requestPermission().then(grant => {
        if (grant !== 'granted') {
            return;
        }

        const notification = new Notification("Hi，您的网络貌似离线了", {
            body: '不过访问过的页面还可以继续打开~',
            // icon: '//lzw.me/images/avatar/lzwme-80x80.png'
        });

        notification.onclick = function() {
            notification.close();
        };
    });
})



routie('*', function(no) {

    if (/blog\/\w+/.test(no)) {
        no = no.split('/')[1]
        console.log(no)

        $.ajax({
            type: "GET",
            url: '/post',
            data: {
                no: no
            },
            dataType: "json",
            success: function(rs){
                $('#category').hide()
                $('#post').html(rs.content).show()
            },
            error: function(err){
                history.go(-1)
                $('#category').show()
                $('#post').html('').hide()
            }
        })
    }else{
        $('#category').show()
        $('#post').html('').hide()
    }

});