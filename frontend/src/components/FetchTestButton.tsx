import useFetch from '../hooks/useFetch.tsx';
import type { Test } from "../types/Test.ts";

function UserButton(){
    const { data, loading, error, fetchData } = useFetch<Test[]>();

    const handleClick = () => {
        fetchData("/api/test", {
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