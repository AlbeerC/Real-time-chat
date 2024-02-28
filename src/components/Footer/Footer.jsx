function Footer () {

    const styles = {
        textAlign: 'center',
        fontSize: '18px',
        position: 'absolute',
        bottom: '0',
        right: '0',
        left: '0'
    }

    return (
        <footer style={styles}>
            <p>Desarrollado por Alberto Caminos usando React y Firebase</p>
        </footer>
    )
}

export default Footer