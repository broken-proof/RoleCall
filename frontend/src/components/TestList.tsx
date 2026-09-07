import type { Test } from "../types/Test";

interface TestListProps {
    tests: Test[] | null;
    loading: boolean;
    error: string | null;
}

function TestList({ tests, loading, error }: TestListProps){
    if (loading && tests === null) return <p>Loading Users...</p>;
    if (error) return <p role="alert">{error}</p>;

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
