import { headphones } from "./headphones"
import { keyboards } from "./keyboards"
import { laptops } from "./laptops"
import { mouses } from "./mouses"
import { smartphones } from "./smartphones"
import { smartwatchs } from "./smartwatchs"
import { tablets } from "./tablets"

const allProduct = [
    ...laptops,
    ...smartphones,
    ...smartwatchs,
    ...tablets,
    ...mouses,
    ...headphones,
    ...keyboards,
]

export default allProduct;