import { useEffect } from 'react';
import CreateTestForm from '../components/CreateTestForm.tsx';
import TestList from '../components/TestList.tsx';
import { useTests } from '../hooks/useTest.ts';

function Home() {
    const { tests, loading, error, getTests } = useTests();

    useEffect(() => {
        getTests();
    }, [getTests]);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <CreateTestForm onCreated={getTests} />
            <TestList tests={tests} loading={loading} error={error} />
        </div>
    );
}

export default Home;
