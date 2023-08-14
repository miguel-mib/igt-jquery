const useMultipleInput = (validateFunction) => {
  const defaultValue = {
    value: "",
    isTouched: false,
    isValid: false,
  };
  const [valuesArray, setValuesArray] = useState([defaultValue]);
  valuesArray.forEach((linkObj) => {
    linkObj.isValid = validateFunction(linkObj.value);
  });

  const addValueHandle = () => {
    setValuesArray((prevArray) => [...prevArray, defaultValue]);
  };

  const deleteValueHandle = (index) => {
    setValuesArray((prevArray) => {
      const array = [...prevArray];
      array.splice(index, 1);
      return [...array];
    });
  };

  const inputBlurHandle = (index) => {
    setValuesArray((prevArray) => {
      const array = [...prevArray];
      array[index].isTouched = true;
      return [...array];
    });
  };

  const valueChangeHandle = (index, value) => {
    setValuesArray((prevArray) => {
      const array = [...prevArray];
      array[index].value = value;
      return [...array];
    });
  };

  const reset = () => {
    setValuesArray([defaultValue]);
  };

  return {
    addValueHandle,
    valueChangeHandle,
    inputBlurHandle,
    deleteValueHandle,
    valuesArray,
    reset,
  };
};

const LinkMultiInput = () => {
  const {
    valuesArray: linksArray,
    valueChangeHandle: linksChangeHandle,
    inputBlurHandle: linksInputBlurHandle,
    addValueHandle: linksAddValueHandle,
    deleteValueHandle: linksDeleteValueHandle,
    reset: linksArrayReset,
  } = useMultipleInput((URL) => URL.trim() !== "");

  const linksInputArray = linksArray.map((linkObj, index) => {
    const hasError = linkObj.isTouched && !linkObj.isValid;

    return (
      <div key={index} className={classes["links-wrapper"]}>
        <input
          type="url"
          id="link"
          value={linkObj.value}
          data-asterisco={linkObrigatorio ? "*" : ""}
          placeholder="Link"
          onChange={(event) => {
            linksChangeHandle(index, event.target.value);
          }}
          onBlur={() => {
            linksInputBlurHandle(index);
          }}
          className={hasError && linkObrigatorio ? classes["input-error"] : ""}
        />
        <button
          onClick={() => {
            linksDeleteValueHandle(index);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    );
  });

  return (
    <div className={`${classes["control"]} ${classes["control__links"]}`}>
      {linksInputArray}
      <Button
        className={classes["add-btn"]}
        type="button"
        onClick={linksAddValueHandle}
      >
        Adicionar link
      </Button>
    </div>
  );
};

export default LinkMultiInput;
