import './NewsCard.css'

function NewsCard() {
    return (
        <div className="card">
            <div className="card-content">
                <h2>Kipróbáltuk, hogy milyen hétről hétre száz liter vizet cipelni a szomjazó fákhoze</h2>
                <div className='meta'>
                    <p className="date">2025.07.29.</p>
                    <p className="author">Kovács Bence Áron</p>
                </div>                
                <p className="description">
                    Ez itt a cikk rövid bevezetője vagy kivonata, amely felkelti az olvasó figyelmét, és kattintásra ösztönöz.
                </p>
                <a className="link-to-article" href="www.google.com">Olvasd tovább</a>
            </div>
        </div>
    )
}

export default NewsCard;
