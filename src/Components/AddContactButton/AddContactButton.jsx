import "./AddContactButton.css"


const AddContactButton = ({setShowForm})=>{
    return (
        <button onClick={()=>{setShowForm(true)}} className="add-button">
            <div className={"plus"}>
                <div className={"plus-bar plus-vertical"}></div>
                <div className={"plus-bar plus-horizontal"}></div>
            </div>
            <p>Add Contact</p>
        </button>
    )
}

export default AddContactButton;