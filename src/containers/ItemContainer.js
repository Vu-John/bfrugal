import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import { getAll } from "../actions/ItemActions";

const mapStateToProps = state => ({
  loading: state.loading,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  getAll: dispatch(getAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
