from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/lists/$listId/items/unpurchased",
    method="GET",
    sql="SELECT * FROM Items WHERE listId = $listId AND purchased = 0",
    description = "Retrieves the items belonging to the specified list that haven't been purchased yet.",
    auth_required=True
)
def get_unpurchased_by_list():
    pass

###############################################################################

@endpoint(
    route="/lists/$listId/items/purchased",
    method="GET",
    sql="SELECT * FROM Items WHERE listId = $listId AND purchased = 1",
    description = "Retrieves the items belonging to the specified list that have been purchased",
    auth_required=True
)
def get_purchased_by_list():
    pass

###############################################################################

@endpoint(
    route="/items/$itemId/increase",
    method="PUT",
    sql="UPDATE Items SET quantity = quantity + 1 WHERE itemId = $itemId",
    #auth_required=True
)
def upQuantity():
    pass

###############################################################################

@endpoint(
    route="/items/$itemId/decrease",
    method="PUT",
    sql="UPDATE Items SET quantity = quantity - 1 WHERE itemId = $itemId",
    #auth_required=True
)
def downQuantity():
    pass

###############################################################################

@endpoint(
    route="/items/$itemId/purchase",
    method="PUT",
    sql="UPDATE Items SET purchased = 1 WHERE itemId = $itemId",
    #auth_required=True
)
def purchase():
    pass

