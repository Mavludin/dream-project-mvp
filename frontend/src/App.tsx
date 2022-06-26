import {
  FormEvent, useEffect, useRef, useState,
} from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [myRes, setMyRes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const studentId = 1;
  const body = `
  function sayHi() {
    console.log('Hi')
  }
  `;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = {
      studentId: 1,
      body: textAreaRef?.current?.value,
    };

    fetch('/api/solutions', {
      method: 'POST',
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMyRes(res.info);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea cols={30} rows={10} ref={textAreaRef} />
        <button type="submit">Send</button>
      </form>

      { myRes && (
        <div style={{ color: 'lightGreen' }}>{myRes}</div>
      )}

      { error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}

    </div>
  );
}

export default App;
