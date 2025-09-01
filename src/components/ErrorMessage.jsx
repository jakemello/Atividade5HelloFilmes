export default function ErrorMessage({ message }) {
  const errorStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#fff0f3',
    color: '#E60026',
    borderRadius: '8px',
    border: '2px solid #F7B3C1',
    margin: '20px 0'
  };
  return (
    <div style={errorStyle}>
      <h3>Oops! Parece que não encontramos o que você procura!</h3>
      <p>{message}</p>
    </div>
  );
}