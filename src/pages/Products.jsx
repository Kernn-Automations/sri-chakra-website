import { useState } from "react";

import ProductIntro from "../sections/products/ProductIntro";
import ProductsGrid from "../sections/products/ProductGrid";
import ProductDetailsPopup from "../sections/products/ProductDetailsPopup";

const Products = () => {
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <>
      <ProductIntro />

      <ProductsGrid
        onSelectProduct={(productKey) => setActiveProduct(productKey)}
      />

      <ProductDetailsPopup
        open={Boolean(activeProduct)}
        productKey={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
};

export default Products;
