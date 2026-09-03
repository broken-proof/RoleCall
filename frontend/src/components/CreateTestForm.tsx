import { useState } from "react";
import { useCreateTests } from "../hooks/useTest";

function CreateTestForm(){
    const [name, setName ] = useState("");
    const [anotherParam, setAnotherParam] = useState("");
    const { createTest, loading, error } = useCreateTests();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await createTest({ name, anotherParam });
            setName("");
            setAnotherParam("");
        } catch {
            //
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    value={anotherParam}
                    onChange={(e) => setAnotherParam(e.target.value)}
                    placeholder="something"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Test"}
                </button>
            </form>
            {error && <p role="alert">{error}</p>}
        </div>
    )
}

export default CreateTestForm;
