const React = require("react")

function Show(props)
{
    const {_id,name,specialty,yearsExperience,available}= props.engineer
    return(
        <div>

            <h1>{name}</h1>
            <a href="/engineers">Back to the index</a>
            <p>Specialty: {specialty}</p>
            <p>Years of experience {yearsExperience}</p>
            <p>Available:{available?`Is available`:`Is not available`}</p>
            <button>
                <a href={`/engineers/${_id}/edit`}>Edit Engineer</a>
            </button>

            <button>
            <form action={`/engineers/${_id}?_method=DELETE`} method="POST">
                <button type="submit">DELETE ENGINEER</button>
            </form>
            </button>

        </div>
    )
}

module.exports=Show