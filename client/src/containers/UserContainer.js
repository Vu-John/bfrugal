import { connect } from "react-redux";
import UserList from "../components/UserList";
import { _delete, getAll } from "../actions/UserActions";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  deleteUser: id => dispatch(_delete(id)),
  getAll: dispatch(getAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
