import { Form } from "react-bootstrap";

export const BudgetFilters = (props) => {
  const { onChange } = props;

  const handleSearchChange = (e) => {
    const value = e.target.value;

    onChange(value);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search budget"
        onChange={handleSearchChange}
      />
    </div>
  );
};
