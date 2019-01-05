import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import { _delete, getAll } from "../actions/ItemActions";

const mapStateToProps = state => ({
  loading: state.loading,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  deleteItem: id => dispatch(_delete(id)),
  getAll: dispatch(getAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
