import useFetch from '../hooks/useFetch.tsx';

const URI = 'http://localhost:8080/api/test';

interface Test{
    id: string,
    name: string,
    anotherParam: string,
}

function UserButton(){
    const { data, loading, error, fetchData } = useFetch<Test[]>();

    const handleClick = () => {
        fetchData(URI, {
            method: "GET"
        });
    }

    return (
        <div>
            <button onClick={handleClick} disabled={loading}>
                {loading ? 'Loading' : 'Get User'}
            </button>
            {error && <p>{error}</p>}
            {data && (
                <ul>
                    {data.map((user) => <li key={user.id}>{user.name}</li>)}
                </ul>
            )}
        </div>
    )
}

export default UserButton;