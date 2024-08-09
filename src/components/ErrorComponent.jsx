const ErrorComponent = ({message}) => {
    return (
        <>
        <section className="error-section">
        <h1>You have reached the error page !!!</h1>
        <p>{message}</p>

        </section>
        </>
    )
}
export default ErrorComponent