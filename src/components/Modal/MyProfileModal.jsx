import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import LoadApi from "../Loading/LoadApi";

const MyProfileModal = ({ isOpen, onClose, handleLogoutClick = () => {} }) => {
    const { contextData } = useContext(AppContext);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const formatBalance = (value) => {
        const num = value > 0 ? parseFloat(value) : Math.abs(value);
        if (isNaN(num)) return "";
        return num.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState('transaction');
    const [pagination, setPagination] = useState({
        start: 0,
        length: 5,
        totalRecords: 0,
        currentPage: 1,
    });

    const handlePageChange = (page) => {
        setPagination((prev) => ({
            ...prev,
            start: (page - 1) * prev.length,
            currentPage: page,
        }));
    };

    const fetchHistory = (type) => {
        setLoading(true);

        let queryParams;
        let apiEndpoint;

        if (type === 'history') {
            queryParams = new URLSearchParams({
                start: pagination.start,
                length: pagination.length,
                type: "slot"
            }).toString();
            apiEndpoint = `/get-history?${queryParams}`;
        } else {
            queryParams = new URLSearchParams({
                start: pagination.start,
                length: pagination.length,
            }).toString();
            apiEndpoint = `/get-transactions?${queryParams}`;
        }

        callApi(
            contextData,
            "GET",
            apiEndpoint,
            (response) => {
                if (response.status === "0") {
                    setTransactions(response.data);
                    setPagination((prev) => ({
                        ...prev,
                        totalRecords: response.recordsTotal || 0,
                    }));
                } else {
                    setTransactions([]);
                    console.error("API error:", response);
                }
                setLoading(false);
            },
            null
        );
    };

    useEffect(() => {
        if (!contextData?.session) {
            navigate("/");
        }
    }, [contextData?.session, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        fetchHistory(activeType);
    }, [pagination.start, pagination.length, activeType]);

    const formatDateDisplay = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "—";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const handleTypeChange = (type) => {
        setActiveType(type);
        setPagination((prev) => ({ ...prev, start: 0, currentPage: 1 }));
    };

    const totalPages = Math.ceil(pagination.totalRecords / pagination.length);

    const getVisiblePages = () => {
        const delta = 1;
        const visiblePages = [];
        let startPage = Math.max(1, pagination.currentPage - delta);
        let endPage = Math.min(totalPages, pagination.currentPage + delta);

        if (endPage - startPage + 1 < 2 * delta + 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 2 * delta);
            } else {
                startPage = Math.max(1, endPage - 2 * delta);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return { visiblePages, startPage, endPage };
    };

    const { visiblePages } = getVisiblePages();

    const handleFirstPage = () => handlePageChange(1);
    const handlePrevPage = () => handlePageChange(pagination.currentPage - 1);
    const handleNextPage = () => handlePageChange(pagination.currentPage + 1);
    const handleLastPage = () => handlePageChange(totalPages);

    return (
        <div className="burger-menu visible">
            <div className="burger-menu-card container">
                <div className="row burger-menu-header">
                    <div className="column column-10"></div>
                    <div className="column align-center"><h2>Cuenta</h2></div>
                    <div className="" onClick={() => onClose()}>
                        <span className="close-button"></span>
                    </div>
                </div>
                <ul className="settings-ul">
                    <li className="with-flex">
                        <a className="logout button button-outline" onClick={() => handleLogoutClick()}>Salir</a>
                    </li>
                    <li>
                        <span className="setting-title">Nombre: </span><span className="user-name-email">{contextData?.session?.user?.id}</span>
                    </li>
                    <li>
                        <span className="setting-title">Usuario: </span><span className="user-name-email">{contextData?.session?.user?.username}</span>
                    </li>
                    <li>
                        <span className="setting-title">Saldo: </span>
                        <div>
                            <span className="icon-balance" style={{ marginRight: 4 }}></span>
                            <span className="user-name-email">{formatBalance(contextData?.session?.user?.balance)}</span>
                        </div>
                    </li>
                </ul>
                <div className="row user-history">
                    <div className={`tab column ${activeType === "transaction" && "active"}`} onClick={() => handleTypeChange("transaction")}>Transacciones</div>
                    <div className={`tab column ${activeType === "history" && "active"}`} onClick={() => handleTypeChange("history")}>Historial de cuenta</div>
                </div>
                <div className="row user-history-header">
                    <div className="column align-center">
                        <h3>{activeType === "transaction" ? "Transacciones Recientes" : "Historial de cuenta"}</h3>
                    </div>
                </div>


                {loading && <div className="py-3"><LoadApi /></div>}

                {!loading && (
                    <>
                        {transactions.length > 0 ? (
                            <div className="table-responsive my-3">
                                {transactions.map((txn, index) => (
                                    <div className="auto-height-card" key={activeType + txn.id + index}>
                                        <div>
                                            <div className="div-inline status-block outcome2" title="Confirmado">
                                                {
                                                    activeType === "transaction" ? <>
                                                        {txn.type === 'add' ? 'DEPOSITO' : 'RETIRO'}
                                                    </> : <>
                                                        {parseFloat(txn.value) > 0 ? 'GANANCIA' : 'JUGADA'}
                                                    </>
                                                }
                                            </div>
                                            <div className="div-inline">#{txn.id}</div>
                                        </div>
                                        <div className="game-title">
                                            <div className="div-inline">Monto:</div>
                                            <div className="div-inline bold">${activeType === "transaction" ? formatBalance(txn.amount) : formatBalance(txn.value)}</div>
                                        </div>
                                        <div className="game-title">
                                            <div className="div-inline">Saldo:</div>
                                            <div className="div-inline bold">${activeType === "transaction" ? formatBalance(txn.to_current_balance) : formatBalance(txn.value_before)}</div>
                                            -&gt;
                                            <div className="div-inline bold">${activeType === "transaction" ? formatBalance(txn.to_new_balance) : formatBalance(txn.value_after)}</div>
                                        </div>
                                        <div className="game-title">
                                            <div className="div-inline">Tiempo de Transacción:</div>
                                            <div className="div-inline">{formatDateDisplay(txn.created_at)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
                                <span>No hay transacciones</span>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <nav>
                                    <ul className="pagination" style={{ margin: 0 }}>
                                        {pagination.currentPage > 1 && (
                                            <>
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handleFirstPage}
                                                    >
                                                        &lt;&lt;
                                                    </button>
                                                </li>
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handlePrevPage}
                                                    >
                                                        &lt;
                                                    </button>
                                                </li>
                                            </>
                                        )}

                                        {visiblePages.map((page) => (
                                            <li
                                                key={page}
                                                className={`page-item ${pagination.currentPage === page ? "active" : ""}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        ))}

                                        {pagination.currentPage < totalPages && (
                                            <>
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handleNextPage}
                                                    >
                                                        &gt;
                                                    </button>
                                                </li>
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handleLastPage}
                                                    >
                                                        &gt;&gt;
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyProfileModal;