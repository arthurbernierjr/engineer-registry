const React=require("react")

function Edit (props) {
    const {_id,name,specialty,yearsExperience,available}= props.engineer
    return(

        <div>
            <h1>New Engineer</h1>
            <a href={`/engineers/${_id}`}>Go back to Index Page</a>
                <form action={`/engineers/${_id}?_method=PUT`} method="POST">
                Name: <input type="text" name="name" defaultValue={name}/><br/>
                specialty: <input type="text" name="specialty" defaultValue={specialty}/><br/>
                Years of Experience: <input type="number" name="yearsExperience" defaultValue={yearsExperience}/><br/>
                Available: {available?<input type="checkbox" name="available" defaultChecked/>:<input type="checkbox" name="available"/>}<br/>
                <input type="submit" value="Add Engineer" />
            </form>
        </div>
    )
}

module.exports = Edit
