import {useCreate} from "../hooks/useCreate.tsx";

const URI = 'http://localhost:8080/api/test';

interface Test {
    id: string;
    name: string;
    anotherParam: string;
}

interface NewTest {
    name: string;
    anotherParam: string;
}

function CreateTestButton(){
    const { create, loading } = useCreate<NewTest, Test>(URI);

    const handleClick = async () => {
        const res = await create({ name: 'Shivam', anotherParam: 'something' });
        console.log(res);
    };

    return (
        <button onClick={handleClick} disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
        </button>
    )
}

export default CreateTestButton;
