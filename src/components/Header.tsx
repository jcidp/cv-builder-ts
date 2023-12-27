import styles from "../styles/Header.module.css";

interface HeaderProps {
    isEditing: boolean,
    onClick(): void
}

function Header({isEditing, onClick}: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <h1>CV Builder</h1>
                <nav>
                    <button onClick={onClick}>{isEditing ? "Visualize" : "Edit"}</button>
                    {!isEditing && <button onClick={() => window.print()}>Print</button>}
                </nav>
            </div>
        </header>
    );
}

export default Header;