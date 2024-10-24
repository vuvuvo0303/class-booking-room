const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#f8d7da] color-[#721c24] text-center p-5">
      <h1 style={styles.title}>Something Went Wrong</h1>
      <p style={styles.message}>Please try again later.</p>
    </div>
  );
};

const styles = {
  title: {
    fontSize: "2rem",
    margin: "0",
  },
  message: {
    fontSize: "1.2rem",
  },
};

export default SomethingWentWrong;
