import useFetch from "../hooks/useFetch.tsx";
import type { NewTest, Test } from "../types/Test.ts";

function CreateTestButton(){
    const { loading, fetchData } = useFetch<Test>();

    const handleClick = async () => {
        const res = await fetchData("/api/test", {
            method: "POST",
            data: { name: 'Shivam', anotherParam: 'something' } as NewTest,
        });
        console.log(res);
    };

    return (
        <button onClick={handleClick} disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
        </button>
    )
}

export default CreateTestButton;
