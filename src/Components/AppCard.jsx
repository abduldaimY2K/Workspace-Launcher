import "../App.css";

function AppCard({ key, AppTitle, AppIcon, Selected, OnClick }) {
    return (
        <div
            onClick={OnClick}
            className={`app-card ${Selected ? "selected" : ""} hover:selected`}
        >
            <div className="app-card-inner">
                <img src={AppIcon} alt={AppTitle} width="50" height="50" />

                <span className="app-card-title">
                    {AppTitle}
                </span>
            </div>
        </div>
    );
}

export default AppCard;