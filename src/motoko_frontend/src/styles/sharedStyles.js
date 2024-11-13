const sharedStyles = {
  inputStyle: {
    marginBottom: '16px',
    width: '100%',
    padding: '14px 18px',
    boxSizing: 'border-box',
    borderRadius: '12px',
    border: '1.5px solid rgba(82, 133, 8, 0.2)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 6px rgba(82, 133, 8, 0.08)'
  },

  buttonStyle: {
    backgroundColor: '#528508ff',
    color: '#ffffff',
    padding: '14px 28px',
    width: '100%',
    borderRadius: '12px',
    border: '2px solid transparent',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    letterSpacing: '0.6px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px rgba(82, 133, 8, 0.2), 0 1px 3px rgba(82, 133, 8, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },

  popupStyle: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '20px',
    maxWidth: '600px',
    width: '90%',
    zIndex: '9999',
    boxShadow: '0 10px 30px rgba(82, 133, 8, 0.15), 0 4px 6px rgba(82, 133, 8, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(82, 133, 8, 0.1)'
  },

  overlayStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 9998
  },

  tableStyle: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    marginTop: '24px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(82, 133, 8, 0.1)',
    '& th': {
      backgroundColor: '#f5f9f5',
      padding: '16px',
      fontWeight: '600',
      color: '#528508ff',
      borderBottom: '2px solid rgba(82, 133, 8, 0.1)',
      textAlign: 'left'
    },
    '& td': {
      padding: '14px 16px',
      borderBottom: '1px solid rgba(82, 133, 8, 0.05)'
    },
    '& tr:last-child td': {
      borderBottom: 'none'
    },
    '& tr:hover': {
      backgroundColor: 'rgba(82, 133, 8, 0.02)'
    }
  }
};

export default sharedStyles; 