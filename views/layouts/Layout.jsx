const React = require('react')

function Layout(props){
 return(
    <html>
        <head>
            <title>{!props.engineer?.name ? 'Best Engineering App Ever!' : `${props.engineer.name} - Engineers App`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <div>
                {props.children}
            </div>
        </body>
    </html>
 )
}

module.exports = Layout