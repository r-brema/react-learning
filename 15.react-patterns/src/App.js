import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./styles.css";
import withToggles from "./HOC";
import { RenderPops as List } from "./RenderProps";
import Counter from "./CompoundComponents";
import { NormalModal as Modal } from "./NormalModel";
import Button from "./Button";
import CompoundComponentsModalWindow from "./CompoundComponentsModalWindow";
import UserList from "./User/UserList";
import RegistrationForm from "./User/RegistrationForm";
import PolymorphicComponents from "./PolymorphicComponents";

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

const ProductListWithToggles = withToggles(ProductList);

export default function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <h1>Polymorphic Components </h1>
      <div className="col-2">
        <PolymorphicComponents />
      </div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />

        <List
          title="Companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>
      <h1>HOC Patterns Demo</h1>
      <div className="col-2">
        <ProductList title="Products List" items={products} />
        <ProductListWithToggles title=" HOC Products Lisy" items={products} />
      </div>
      <h1>Compound Components Patterns Demo</h1>
      <div className="col-2">
        <Counter>
          <Counter.Label>My super flexible counter</Counter.Label>
          <Counter.Decrease icon="-" />
          <Counter.Count />
          <Counter.Increase icon="+" />
        </Counter>
        <Counter>
          <Counter.Decrease icon="◀️" />
          <Counter.Count />
          <Counter.Increase icon="▶️" />
        </Counter>
      </div>
      <h1>Modal box demo</h1>
      <div className="col-2">
        <div>
          <p>Simple Modal window without patterns</p>
          <Button
            variation="primary"
            onClick={() => setIsOpenModal((show) => !show)}
          >
            Open Model window
          </Button>
          {isOpenModal && (
            <Modal onClose={() => setIsOpenModal(false)}>
              <RegistrationForm />
            </Modal>
          )}
        </div>
        <div>
          <p>Modal window using compound cmponents patterns</p>
          {/* first button to open new modal */}
          <CompoundComponentsModalWindow>
            <CompoundComponentsModalWindow.Open opens="add-user">
              <Button>Add User</Button>
            </CompoundComponentsModalWindow.Open>
            <CompoundComponentsModalWindow.Window name="add-user">
              <RegistrationForm />
            </CompoundComponentsModalWindow.Window>
          </CompoundComponentsModalWindow>
          {/* second button to open new modal */}
          &nbsp; &nbsp;
          <CompoundComponentsModalWindow>
            <CompoundComponentsModalWindow.Open opens="user-list">
              <Button>View Users</Button>
            </CompoundComponentsModalWindow.Open>
            <CompoundComponentsModalWindow.Window name="user-list">
              <UserList />
            </CompoundComponentsModalWindow.Window>
          </CompoundComponentsModalWindow>
        </div>
      </div>
    </div>
  );
}
