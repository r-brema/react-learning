function Button({
  as: Component = "button",
  children,
  onClick,
  size = "large",
  variant = "primary",
  ...otherProps
}) {
  return (
    <Component
      onClick={onClick}
      {...otherProps}
      className={`${size} ${variant}`}
    >
      {children}
    </Component>
  );
}

const PolymorphicComponents = () => {
  return (
    <div>
      <Button as="a" href={`#ngo`} size="small" variant="secondary">
        I'm link
      </Button>

      <Button size="small" variant="secondary">
        I'm Button
      </Button>
      <Button type="submit" value="Submit" size="medium" variant="primary">
        Submit
      </Button>

      <Button type="reset" value="delete" size="large" variant="danger">
        Delete
      </Button>
    </div>
  );
};

export default PolymorphicComponents;
