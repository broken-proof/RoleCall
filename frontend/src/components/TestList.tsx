import { useEffect } from "react";
import { useTests } from "../hooks/useTest.ts";

function TestList(){
    const { tests, loading, error, getTests } = useTests();

    useEffect(() => {
        getTests();
    }, [getTests]);

    if (loading) return <p>Loading Users...</p>;
    if (error) return <p role="alert">Error</p>;

    return (
        <ul>
            {tests?.map((test) => (
                <li key={test.id}>
                    {test.name} ({test.anotherParam})
                </li>
            ))}
        </ul>
    )
}

export default TestList;