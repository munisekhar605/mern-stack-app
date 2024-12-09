import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/apiService';
import './TransactionList.css';  // Optional CSS for styling

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(page, perPage, search);
      console.log('Fetched transactions:', data);
      
      // Check if data is an array
      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);  // Fallback to an empty array if data is not an array
      }
      setLoading(false);
    };
    fetchTransactions();
  }, [page, perPage, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);  // Reset to page 1 when search text changes
  };

  return (
    <div className="transaction-list">
      <h1>Product Transactions</h1>
      
      <input
        type="text"
        className="search-input"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearch}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="transaction-list__items">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction._id} className="transaction-item">
                <h3>{transaction.title}</h3>
                <p>{transaction.description}</p>
                <p className="price">${transaction.price}</p>
              </li>
            ))
          ) : (
            <p>No transactions available</p>
          )}
        </ul>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionList;
