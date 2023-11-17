const handleErrorResponse = (error: any) => {
  if ('data' in error) {
    const data = error.data;
    if (data !== null && typeof data === 'object' && 'message' in data) {
      const errorMessage = data.message;
      alert(errorMessage);
    }
  } else {
    alert('잠시 후에 다시 시도해주세요.');
  }
};

export default handleErrorResponse;
