FROM node:10

LABEL version="2.0.0"
LABEL repository="http://github.com/mikeal/bundle-size-action"
LABEL homepage="http://github.com/mikeal/bundle-size-action"
LABEL maintainer="Mikeal Rogers <mikeal.rogers@gmail.com>"

LABEL com.github.actions.name="GitHub Action for JS Bundle Size"
LABEL com.github.actions.description="Creates a bundle and adds size information where relevant."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="red"

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
