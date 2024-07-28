import React, { useState, useContext } from "react";
import { AdminContext } from "../../Context/Context";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
  Button,
  CircularProgress,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Add, Remove } from "@mui/icons-material";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Side Dish",
  "Salad",
  "Soup",
];

const dietaryTypes = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb",
  "Low-Fat",
  "Mediterranean",
  "Whole30",
  "Diabetic-Friendly",
  "Heart-Healthy",
  "Plant-Based",
  "High-Protein",
  "Low-Sodium",
  "Raw Food",
  "Intermittent Fasting",
];

function getStyles(name, mealType, theme) {
  return {
    fontWeight:
      mealType?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InsertForm({ data }) {
  const { loading, setLoading, insertNewMeal, updateMeal } =
    useContext(AdminContext);
  const theme = useTheme();
  const [mealType, setMealType] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [mealInfo, setMealInfo] = useState({
    title: "",
    subTitle: "",
    dietaryType: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    calories: "",
    carbohydrate: "",
    protein: "",
    fat: "",
    description: "",
    ingredients: [{ unit: "", unitOfMeasure: "", ingredient: "" }],
    instructions: [""],
    picture: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setMealType(data?.mealType.split(","));
      setMealInfo({
        title: data?.title,
        subTitle: data?.subTitle,
        dietaryType: data?.dietaryType,
        prepTime: data?.prepTime,
        cookTime: data?.cookTime,
        servings: data?.servings,
        calories: data?.calories,
        carbohydrate: data?.carbohydrate,
        protein: data?.protein,
        fat: data?.fat,
        description: data?.description,
        ingredients: [...data?.ingredients],
        instructions: [...data?.instructions],
        picture: data.picture,
      });
    } else {
      setMealType([]);
    }
  }, [data]);

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setMealInfo({ ...mealInfo, [e.target.name]: e.target.files[0] });
    } else {
      setMealInfo({ ...mealInfo, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setMealType(typeof value === "string" ? value.split(",") : value);
    setErrors({ ...errors, mealType: "" });
  };

  const handleAddIngredient = () => {
    const values = [...mealInfo.ingredients];
    values.push({ unit: "", unitOfMeasure: "", ingredient: "" });
    setMealInfo({ ...mealInfo, ingredients: values });
  };

  const handleRemoveIngredient = (index) => {
    const values = [...mealInfo.ingredients];
    values.splice(index, 1);
    setMealInfo({ ...mealInfo, ingredients: values });
  };

  const handleAddInstruction = () => {
    const values = [...mealInfo.instructions];
    values.push("");
    setMealInfo({ ...mealInfo, instructions: values });
  };

  const handleRemoveInstruction = (index) => {
    const values = [...mealInfo.instructions];
    values.splice(index, 1);
    setMealInfo({ ...mealInfo, instructions: values });
  };

  const handleIngredientChange = (index, event) => {
    const values = [...mealInfo.ingredients];
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };
    setMealInfo({ ...mealInfo, ingredients: values });
  };

  const handleInstructionChange = (index, event) => {
    const values = [...mealInfo.instructions];
    values[index] = event.target.value;
    setMealInfo({ ...mealInfo, instructions: values });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (mealType.length === 0) {
      valid = false;
      newErrors["mealType"] = "This field is required";
    } else {
      newErrors["mealType"] = "";
    }

    Object.keys(mealInfo).forEach((key) => {
      if (key === "ingredients") {
        mealInfo[key].forEach((ingredient, index) => {
          Object.keys(ingredient).forEach((field) => {
            if (!ingredient[field]) {
              valid = false;
              newErrors[`ingredient-${index}-${field}`] =
                "This field is required";
            }
          });
        });
      } else if (key === "instructions") {
        mealInfo[key].forEach((instruction, index) => {
          if (!instruction) {
            valid = false;
            newErrors[`instruction-${index}`] = "This field is required";
          }
        });
      } else if (key === "picture" && typeof mealInfo[key] === "object") {
        // skip file object validation, it's optional on update
      } else {
        if (!mealInfo[key]) {
          valid = false;
          newErrors[key] = "This field is required";
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      setDisabled(true);
      const mealData = new FormData();
      mealData.append("title", mealInfo.title);
      mealData.append("subTitle", mealInfo.subTitle);
      mealData.append("dietaryType", mealInfo.dietaryType);
      mealData.append("mealType", mealType.join(","));
      mealData.append("prepTime", mealInfo.prepTime);
      mealData.append("cookTime", mealInfo.cookTime);
      mealData.append("servings", mealInfo.servings);
      mealData.append("calories", mealInfo.calories);
      mealData.append("carbohydrate", mealInfo.carbohydrate);
      mealData.append("protein", mealInfo.protein);
      mealData.append("fat", mealInfo.fat);
      mealData.append("picture", mealInfo.picture);
      mealData.append("description", mealInfo.description);
      mealData.append("ingredients", JSON.stringify(mealInfo.ingredients));
      mealInfo.instructions.forEach((item) => {
        mealData.append("instructions", item);
      });
      if (data) {
        updateMeal(data?._id, mealData);
      } else {
        insertNewMeal(mealData);
      }
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="title"
              value={mealInfo?.title}
              InputLabelProps={{ shrink: data && true }}
              label="Enter title"
              fullWidth
              autoFocus
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="subTitle"
              value={mealInfo?.subTitle}
              InputLabelProps={{ shrink: data && true }}
              label="Enter sub title"
              fullWidth
              error={!!errors.subTitle}
              helperText={errors.subTitle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.dietaryType}>
              <InputLabel id="demo-simple-select-error-label">
                Select the Dietary Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="Select the Dietary Type"
                onChange={handleChange}
                name="dietaryType"
                InputLabelProps={{ shrink: data && true }}
                value={mealInfo?.dietaryType || ""}
              >
                {dietaryTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors?.dietaryType ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.dietaryType}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  Select the dietary type for the meal
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.mealType}>
              <InputLabel id="demo-multiple-name-label">Meal Type</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={mealType}
                multiple
                onChange={handleChange2}
                input={<OutlinedInput label="Meal Type" />}
                MenuProps={MenuProps}
              >
                {mealTypes?.map((name, index) => (
                  <MenuItem
                    key={index}
                    value={name}
                    // style={getStyles(name, mealType, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.mealType ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.mealType}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  Select one or more meal types for your diet
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="prepTime"
              value={mealInfo?.prepTime}
              InputLabelProps={{ shrink: data && true }}
              label="Type the preparation time here"
              fullWidth
              error={!!errors.prepTime}
              helperText={errors.prepTime}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="cookTime"
              value={mealInfo?.cookTime}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the cooking time here"
              fullWidth
              error={!!errors.cookTime}
              helperText={errors.cookTime}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="servings"
              value={mealInfo?.servings}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the number of servings"
              fullWidth
              error={!!errors.servings}
              helperText={errors.servings}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="calories"
              value={mealInfo?.calories}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the amount of calories"
              fullWidth
              error={!!errors.calories}
              helperText={errors.calories}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="carbohydrate"
              value={mealInfo?.carbohydrate}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the amount of carbohydrates in grams"
              fullWidth
              error={!!errors.carbohydrate}
              helperText={errors.carbohydrate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="protein"
              value={mealInfo?.protein}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the amount of proteins in grams"
              fullWidth
              error={!!errors.protein}
              helperText={errors.protein}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="fat"
              value={mealInfo?.fat}
              InputLabelProps={{ shrink: data && true }}
              label="Enter the amount of fat in grams"
              fullWidth
              error={!!errors.fat}
              helperText={errors.fat}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              name="picture"
              InputLabelProps={{ shrink: true }}
              label="Upload dish picture"
              type="file"
              fullWidth
              error={!!errors.picture}
              helperText={errors.picture}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={handleChange}
              name="description"
              value={mealInfo?.description}
              InputLabelProps={{ shrink: data && true }}
              label="Type the description"
              placeholder="Type the description here"
              fullWidth
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          {mealInfo?.ingredients.map((ingredient, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={(event) => handleIngredientChange(index, event)}
                  fullWidth
                  variant="outlined"
                  label="Enter Unit"
                  name="unit"
                  value={ingredient?.unit}
                  error={!!errors[`ingredient-${index}-unit`]}
                  helperText={errors[`ingredient-${index}-unit`]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={(event) => handleIngredientChange(index, event)}
                  fullWidth
                  variant="outlined"
                  label="Enter Unit of Measure"
                  name="unitOfMeasure"
                  value={ingredient?.unitOfMeasure}
                  error={!!errors[`ingredient-${index}-unitOfMeasure`]}
                  helperText={errors[`ingredient-${index}-unitOfMeasure`]}
                />
              </Grid>
              <Grid sx={{ display: "flex" }} item xs={12} sm={4}>
                <TextField
                  onChange={(event) => handleIngredientChange(index, event)}
                  fullWidth
                  variant="outlined"
                  label="Enter the Ingredient"
                  name="ingredient"
                  value={ingredient?.ingredient}
                  error={!!errors[`ingredient-${index}-ingredient`]}
                  helperText={errors[`ingredient-${index}-ingredient`]}
                />
                {mealInfo?.ingredients.length > 1 && (
                  <IconButton
                    type="button"
                    color="error"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    <Remove />
                  </IconButton>
                )}
              </Grid>
            </React.Fragment>
          ))}
          {mealInfo?.instructions.map((instruction, index) => (
            <Grid sx={{ display: "flex" }} item xs={12} sm={12} key={index}>
              <TextField
                onChange={(event) => handleInstructionChange(index, event)}
                fullWidth
                variant="outlined"
                label="Type Instructions"
                name="instructions"
                value={instruction}
                error={!!errors[`instruction-${index}`]}
                helperText={errors[`instruction-${index}`]}
              />
              {mealInfo?.instructions.length > 1 && (
                <IconButton
                  type="button"
                  color="error"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <Remove />
                </IconButton>
              )}
            </Grid>
          ))}
          <Grid item xs={12} sm={12}>
            <Button
              sx={{ mt: 2, backgroundColor: "#6691ab" }}
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={disabled}
            >
              {loading ? <CircularProgress size={30} /> : "Submit"}
            </Button>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              mt: 1,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Button
                sx={{ color: "#6691ab" }}
                startIcon={<Add sx={{ color: "#6691ab" }} />}
                fullWidth
                variant="outlined"
                type="button"
                onClick={handleAddIngredient}
              >
                Ingredients
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={{ color: "#6691ab" }}
                startIcon={<Add sx={{ color: "#6691ab" }} />}
                fullWidth
                variant="outlined"
                type="button"
                onClick={handleAddInstruction}
              >
                Instructions
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
