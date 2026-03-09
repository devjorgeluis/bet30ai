import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import LoadApi from "../Loading/LoadApi";
import IconProfile from "/src/assets/svg/profile-circle.svg";
import IconDollar from "/src/assets/svg/dollar.svg";
import IconHistory from "/src/assets/svg/history.svg";
import IconArrowUp from "/src/assets/svg/arrow-up.svg";
import IconClose from "/src/assets/svg/white-close.svg";
import IconLogout from "/src/assets/svg/logout.svg";

const MyProfileModal = ({ isMobile, isOpen, onClose, handleLogoutClick = () => { } }) => {
    const { contextData } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('transactions');
    const [pagination, setPagination] = useState({
        start: 0,
        length: 10,
        totalRecords: 0,
        currentPage: 1,
    });

    // Format balance helper
    const formatBalance = (value) => {
        const num = value > 0 ? parseFloat(value) : Math.abs(value);
        if (isNaN(num)) return "";
        return num.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // Format date helper
    const formatDateTime = useCallback((dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "—";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }, []);

    // Redirect if no session
    useEffect(() => {
        if (!contextData?.session) {
            navigate("/");
        }
    }, [contextData?.session, navigate]);

    // Scroll to top on location change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

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
        fetchHistory(activeTab);
    }, [pagination.start, pagination.length, activeTab]);

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPagination((prev) => ({ ...prev, start: 0, currentPage: 1 }));
    };

    // Handle page change
    const handlePageChange = (page) => {
        setPagination((prev) => ({
            ...prev,
            start: (page - 1) * prev.length,
            currentPage: page,
        }));
    };

    // Calculate total pages
    const totalPages = useMemo(() => 
        Math.ceil(pagination.totalRecords / pagination.length),
        [pagination.totalRecords, pagination.length]
    );

    // Get transaction type and amount
    const getTransactionInfo = (item) => {
        if (activeTab === 'transactions') {
            const type = item.type === 'add' ? 'Depósito' : 'Retiro';
            const amount = formatBalance(item.amount);
            const isDeposit = item.type === 'add';
            return { type, amount, isDeposit };
        } else {
            const value = parseFloat(item.value);
            const type = value > 0 ? 'Ganancia' : 'Jugada';
            const amount = formatBalance(Math.abs(value));
            const isDeposit = value > 0;
            return { type, amount, isDeposit };
        }
    };

    // Generate visible pages for pagination
    const getVisiblePages = () => {
        const delta = 2;
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

        return visiblePages;
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content account-modal" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="header-top">
                        <h2>
                            <img src={IconProfile} alt="Profile" />
                            Mi Cuenta
                        </h2>
                        <button className="close-btn" onClick={onClose} aria-label="Close">
                            <img src={IconClose} alt="Close" />
                        </button>
                    </div>

                    {/* User Info Section */}
                    <div className="user-info-section">
                        <div className="info-grid">
                            <div className="info-row">
                                <span className="info-label">Id:</span>
                                <span className="info-value">
                                    {contextData?.session?.user?.id || "No disponible"}
                                </span>
                            </div>
                            {
                                !isMobile && 
                                <div className="info-row">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">
                                        {contextData?.session?.user?.email || "No disponible"}
                                    </span>
                                </div>
                            }
                            <div className="info-row">
                                <span className="info-label">Usuario:</span>
                                <span className="info-value">
                                    {contextData?.session?.user?.username || "No disponible"}
                                </span>
                            </div>
                            {
                                !isMobile && 
                                <div className="info-row">
                                    <span className="info-label">Saldo:</span>
                                    <span className="info-value balance">
                                        $ {formatBalance(contextData?.session?.user?.balance)}
                                    </span>
                                </div>
                            }
                        </div>

                        <div className="action-buttons">
                            <button className="btn-danger" onClick={handleLogoutClick}>
                                <img src={IconLogout} alt="Logout" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => handleTabChange('transactions')}
                    >
                        <img src={IconDollar} alt="Transactions" />
                        <span>Transacciones</span>
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => handleTabChange('history')}
                    >
                        <img src={IconHistory} alt="History" />
                        <span>Historial de cuenta</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    {loading && <LoadApi />}

                    {!loading && (
                        <div className="history-list">
                            {transactions.length > 0 ? (
                                <>
                                    <div className="transaction-items">
                                        {transactions.map((item, index) => {
                                            const { type, amount, isDeposit } = getTransactionInfo(item);
                                            return (
                                                <div key={activeTab + item.id + index} className="transaction-item">
                                                    <div className="transaction-left">
                                                        <div className="transaction-type">
                                                            <img 
                                                                src={IconArrowUp} 
                                                                style={{ transform: isDeposit ? "rotate(180deg)" : "rotate(0)" }}
                                                                alt={type}
                                                                className={isDeposit ? 'deposit-icon' : 'withdrawal-icon'}
                                                            />
                                                            <span>{type}</span>
                                                        </div>
                                                        <div className="transaction-date">
                                                            {formatDateTime(item.created_at)}
                                                        </div>
                                                        <div className="transaction-date">
                                                            ID: {item.txn_id || item.id}
                                                        </div>
                                                        <div className="transaction-date">
                                                            Balance Previo: $ {formatBalance(item.value_before || item.to_current_balance )}
                                                        </div>
                                                        <div className="transaction-date">
                                                            Balance Posterior: $ {formatBalance(item.value_after || item.to_new_balance )}
                                                        </div>
                                                    </div>
                                                    <div className="transaction-right">
                                                        <div className={`transaction-amount ${isDeposit ? 'deposit' : 'withdrawal'}`}>
                                                            $ {amount}
                                                        </div>
                                                        <div className="transaction-status status-completed">
                                                            Completada
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="pagination-container">
                                            <nav>
                                                <ul className="pagination">
                                                    {pagination.currentPage > 1 && (
                                                        <>
                                                            <li className="page-item">
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() => handlePageChange(1)}
                                                                    aria-label="First page"
                                                                >
                                                                    &lt;&lt;
                                                                </button>
                                                            </li>
                                                            <li className="page-item">
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                                    aria-label="Previous page"
                                                                >
                                                                    &lt;
                                                                </button>
                                                            </li>
                                                        </>
                                                    )}

                                                    {getVisiblePages().map((page) => (
                                                        <li
                                                            key={page}
                                                            className={`page-item ${pagination.currentPage === page ? 'active' : ''}`}
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
                                                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                                    aria-label="Next page"
                                                                >
                                                                    &gt;
                                                                </button>
                                                            </li>
                                                            <li className="page-item">
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() => handlePageChange(totalPages)}
                                                                    aria-label="Last page"
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
                            ) : (
                                <div className="empty-state">
                                    <p>No hay {activeTab === 'transactions' ? 'transacciones' : 'historial'} para mostrar</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfileModal;