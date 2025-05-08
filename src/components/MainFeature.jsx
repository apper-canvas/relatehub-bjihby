import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  const [contactsData, setContactsData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead'
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeContact, setActiveContact] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Icons declaration
  const Plus = getIcon('Plus');
  const Search = getIcon('Search');
  const ChevronDown = getIcon('ChevronDown');
  const X = getIcon('X');
  const Check = getIcon('Check');
  const User = getIcon('User');
  const Building = getIcon('Building');
  const Phone = getIcon('Phone');
  const Mail = getIcon('Mail');
  const Tag = getIcon('Tag');
  const Edit = getIcon('Edit');
  const Trash = getIcon('Trash');
  const Filter = getIcon('Filter');
  const ArrowLeft = getIcon('ArrowLeft');

  // Mock data
  useEffect(() => {
    const mockData = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        company: 'Acme Inc.',
        status: 'lead',
        createdAt: new Date('2023-03-15').toISOString()
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '(555) 987-6543',
        company: 'Global Tech',
        status: 'customer',
        createdAt: new Date('2023-02-28').toISOString()
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@example.com',
        phone: '(555) 456-7890',
        company: 'ABC Corp',
        status: 'prospect',
        createdAt: new Date('2023-04-05').toISOString()
      },
      {
        id: '4',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@example.com',
        phone: '(555) 789-0123',
        company: 'Innovate LLC',
        status: 'lead',
        createdAt: new Date('2023-03-25').toISOString()
      },
      {
        id: '5',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.b@example.com',
        phone: '(555) 321-6547',
        company: 'Tech Solutions',
        status: 'customer',
        createdAt: new Date('2023-03-10').toISOString()
      }
    ];

    setTimeout(() => {
      setContactsData(mockData);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field if it exists
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }
    
    if (!formData.company.trim()) errors.company = "Company is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    // Add new contact
    const newContact = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    setContactsData(prev => [newContact, ...prev]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      status: 'lead'
    });
    setIsAdding(false);
    toast.success("Contact added successfully!");
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleDeleteContact = (id) => {
    setContactsData(prev => prev.filter(contact => contact.id !== id));
    if (activeContact?.id === id) {
      setActiveContact(null);
    }
    toast.success("Contact deleted successfully");
  };

  // Filter contacts based on search term and status
  const filteredContacts = contactsData.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    lead: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    prospect: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    customer: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    churned: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-xl font-semibold">Contact Management</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Contact</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Contact</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input ${validationErrors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="John"
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`input ${validationErrors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Doe"
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input ${validationErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="john.doe@example.com"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="label">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`input ${validationErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="label">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`input ${validationErrors.company ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Acme Inc."
                  />
                  {validationErrors.company && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="status" className="label">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="lead">Lead</option>
                    <option value="prospect">Prospect</option>
                    <option value="customer">Customer</option>
                    <option value="churned">Churned</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="btn bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-800 dark:text-surface-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Check size={18} />
                  Save Contact
                </button>
              </div>
            </form>
          </motion.div>
        ) : activeContact ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveContact(null)}
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <ArrowLeft size={18} />
                </button>
                <h3 className="text-xl font-semibold">Contact Details</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[activeContact.status]}`}>
                  {activeContact.status.charAt(0).toUpperCase() + activeContact.status.slice(1)}
                </span>
                <div className="flex items-center">
                  <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-primary">
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteContact(activeContact.id)}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-red-500"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
                  <div className="bg-surface-100 dark:bg-surface-800 px-4 py-3 font-medium">
                    Basic Information
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <User size={18} className="mt-0.5 text-surface-500" />
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Full Name</p>
                        <p className="font-medium">{activeContact.firstName} {activeContact.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="mt-0.5 text-surface-500" />
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                        <p className="font-medium">{activeContact.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="mt-0.5 text-surface-500" />
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Phone</p>
                        <p className="font-medium">{activeContact.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Building size={18} className="mt-0.5 text-surface-500" />
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Company</p>
                        <p className="font-medium">{activeContact.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
                  <div className="bg-surface-100 dark:bg-surface-800 px-4 py-3 font-medium flex justify-between items-center">
                    <span>Activity</span>
                    <button className="text-primary text-sm font-medium">Add Note</button>
                  </div>
                  <div className="p-4">
                    <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                      <p>No activity yet</p>
                      <p className="text-sm mt-1">Record your first interaction with this contact</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
                  <div className="bg-surface-100 dark:bg-surface-800 px-4 py-3 font-medium">
                    Additional Information
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Tag size={18} className="mt-0.5 text-surface-500" />
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Created At</p>
                        <p className="font-medium">{formatDate(activeContact.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                  <Search size={18} />
                </span>
              </div>
              
              <div className="flex gap-2">
                <div className="relative group">
                  <button className="btn bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2">
                    <Filter size={16} />
                    <span>{selectedStatus === 'all' ? 'All Statuses' : `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}`}</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 overflow-hidden z-10 hidden group-hover:block">
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => handleStatusFilter('all')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStatus === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        All Statuses
                      </button>
                      <button
                        onClick={() => handleStatusFilter('lead')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStatus === 'lead' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        Lead
                      </button>
                      <button
                        onClick={() => handleStatusFilter('prospect')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStatus === 'prospect' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        Prospect
                      </button>
                      <button
                        onClick={() => handleStatusFilter('customer')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStatus === 'customer' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        Customer
                      </button>
                      <button
                        onClick={() => handleStatusFilter('churned')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStatus === 'churned' ? 'bg-primary/10 text-primary' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        Churned
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No contacts found</h3>
                <p className="text-surface-500 dark:text-surface-400 mb-6">
                  {searchTerm ? "Try a different search term or filter" : "Add your first contact to get started"}
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add Contact
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {filteredContacts.map(contact => (
                      <motion.tr 
                        key={contact.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer transition-colors"
                        onClick={() => setActiveContact(contact)}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-medium">
                              {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                              <div className="text-sm text-surface-500 dark:text-surface-400">{contact.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{contact.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{contact.company}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[contact.status]}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteContact(contact.id);
                            }}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-3"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;