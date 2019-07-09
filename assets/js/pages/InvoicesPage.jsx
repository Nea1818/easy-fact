import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "info",
  CANCELLED: "secondary"
};

const STATUS_LABELS = {
  PAID: "payé",
  SENT: "envoyé",
  CANCELLED: "annulé"
};

const InvoicesPage = props => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  // Récupération des Invoices auprès de l'API
  const fetchInvoices = async () => {
    try {
      const data = await axios
        .get("http://127.0.0.1:8000/api/invoices")
        .then(response => response.data["hydra:member"]);
      setInvoices(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Récupérr les Invoices au chargement du composant
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Gestion de la suppression d'une facture
  const handleDelete = async id => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter(invoice => invoice.id !== id));

    try {
      await InvoicesAPI.delete(id);
    } catch (error) {
      console.log(error.response);
      setInvoices(originalInvoices);
    }
  };

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  // Gestion du format de date
  const formatDate = str => moment(str).format("DD/MM/YYYY");

  // Filtrage des invoices en fonction de la recherche
  const filteredInvoices = invoices.filter(
    i =>
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().startsWith(search.toLowerCase()) ||
      STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
  );

  // Pagination des données
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <h1>Liste des Factures</h1>
      <div className='form-group'>
        <input
          type='text'
          onChange={handleSearch}
          value={search}
          className='form-control'
          placeholder='Rechercher...'
        />
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Client</th>
            <th className='text-center'>Date d'envoi</th>
            <th className='text-center'>Statut</th>
            <th className='text-center'>Montant</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <a href='#'>
                  {invoice.customer.firstName} {invoice.customer.lastName}
                </a>
              </td>
              <td className='text-center'>{formatDate(invoice.sentAt)}</td>
              <td className='text-center'>
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </td>
              <td className='text-center'>
                {invoice.amount.toLocaleString()} euros
              </td>
              <td>
                <button className='btn btn-sm btn-secondary mx-2'>
                  Editer
                </button>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChanged={handlePageChange}
        length={filteredInvoices.length}
      />
    </>
  );
};

export default InvoicesPage;
