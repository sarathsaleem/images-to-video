exports.resizeVersion = {
    default: {
        thumbnail:{
            width:80,
            height:"80!"
        },
        small: {
            width:200,
            height:"150!"
        },
        medium:{
            width:400,
            height:300
        },
        large: {
            width: 800,
            height: 600
        }
    },
    location : {
        thumbnail:{
            width:80,
            height:"80^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "80x80"
            ]
        },
        small: {
            width:"200",
            height:"150^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "200x150"
            ]
        },
        medium:{
            width:400,
            height:300
        },
        large: {
            width: 800,
            height: 600
        }
    }
};

exports.directors = {
    temp: './tmp',

    default: '/public/images/default',
    default_url: '/images/default',

    location: '/public/images/location',
    location_url: '/images/location'
};