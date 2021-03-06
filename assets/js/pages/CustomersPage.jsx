import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import CustomersAPI from '../services/customersAPI'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'

const CustomersPage = props => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  //Permet d'aller récupérer les customers
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll()
      setCustomers(data)
      setLoading(false)
    } catch (error) {
      toast.error('Une erreur est survenue lors du chargement des clients')
    }
  }

  //Au chargement du composant on récup les customers
  useEffect(() => {
    fetchCustomers()
  }, [])

  // Gestion de la suppression d'un customer
  const handleDelete = async id => {
    const originalCustomers = [...customers]

    setCustomers(customers.filter(customer => customer.id !== id))

    try {
      await CustomersAPI.delete(id)
      toast.success('Le client a bien été supprimé')
    } catch (error) {
      setCustomers(originalCustomers)
      toast.error('Une erreur est survenue lors de la suppression du client')
    }
  }

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page)

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  const itemsPerPage = 6

  // Filtrage des customers en fonction de la recherche
  const filteredCustomers = customers.filter(
    c =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  )

  // Pagination des données
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  )

  return (
    <>
      <div className='mb-2 d-flex justify-content-between align-items-center'>
        <h1 className='my-3'>Liste des clients</h1>
        <div className='div'>
          <Link to='/customers/new' className='btn btn-primary mx-3'>
            Créer un client
          </Link>
          <Link to='/invoices'>Accès aux factures</Link>
        </div>
      </div>
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
            <th>Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className='text-center'>Factures</th>
            <th className='text-center'>Montant total</th>
            <th />
          </tr>
        </thead>

        {!loading && (
          <tbody>
            {paginatedCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  <Link to={'/customers/' + customer.id}>
                    {customer.firstName} {customer.lastName}
                  </Link>
                </td>
                <td>{customer.email}</td>
                <td>{customer.company}</td>
                <td className='text-center'>
                  <span className='badge badge-secondary'>
                    {customer.invoices.length}
                  </span>
                </td>
                <td className='text-center'>
                  {customer.totalAmount.toLocaleString()} euros
                </td>
                <td>
                  <Link
                    to={'/customers/' + customer.id}
                    className='btn btn-sm btn-secondary mx-2'
                  >
                    Editer
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    disabled={customer.invoices.length > 0}
                    className='btn btn-sm btn-danger'
                  >
                    Supprimer
                  </button>
                </td>
                <td />
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && <TableLoader />}

      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  )
}

export default CustomersPage
