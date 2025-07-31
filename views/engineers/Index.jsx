const React=require("react")
function Index (props){
    const engineers=props.engineers
    return(
        <div>


        <h1>Engineers page</h1>
        <a href="/engineers/new">Add new Engineer</a>

        <ul>
            {
                engineers.map(engineer=>{
                    return(
                        <li>
                            <a href={`/engineers/${engineer._id}`}><h3>{engineer.name}</h3> </a>  
                            <p>Specialty: {engineer.specialty}</p>
                            <p>years of Experience: {engineer.yearsExperience}</p>
                            <p>available:{engineer.available?`is available`:`Is not available`}</p>
                        </li>
                    )
                })
            }
        </ul>

        </div>
    )
}

module.exports=Index
