from silence.decorators import endpoint

@endpoint(
    route="/lists/user/$userId",
    method="GET",
    sql="SELECT * FROM Lists WHERE userId = $userId",
    description = "Retrieves the lists belonging to the specified user.",
    auth_required=True
)
def get_by_user():
    pass
