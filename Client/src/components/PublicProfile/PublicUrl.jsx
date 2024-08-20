const PublicUrl = (props) => {
  const { url, title } = props.data;
  const { text_color, background_color } = props.config;

  return (
    <div
      style={{
        color: `${text_color}`,
        margin: '10px',
        borderRadius: '25em',
        border: 'solid 1px white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '25px',
        transition: 'transform 0.3s ease', // Add transition for smooth effect
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.009)'; // Scale up on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Revert back to normal
      }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit", // Inherit the color from the parent
        }}
      >
        {title}
      </a>
    </div>
  );
};

export default PublicUrl;
