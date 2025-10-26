// puck/maps.ts
export const heightMap: Record<string, string> = {
  'auto': 'min-h-0',
  'sm': 'min-h-64',
  'md': 'min-h-96',
  'lg': 'min-h-screen-75',
  'xl': 'min-h-screen',
  'custom': 'min-h-80'
};

export const paddingYMap: Record<string, string> = {
  'none': 'py-0',
  'xs': 'py-4',
  'sm': 'py-8',
  'md': 'py-16',
  'lg': 'py-24',
  'xl': 'py-32'
};

export const paddingXMap: Record<string, string> = {
  'none': 'px-0',
  'sm': 'px-4',
  'md': 'px-6',
  'lg': 'px-8'
};

export const maxWidthMap: Record<string, string> = {
  'sm': 'max-w-2xl',
  'md': 'max-w-4xl',
  'lg': 'max-w-6xl',
  'xl': 'max-w-7xl',
  'full': 'max-w-full'
};

export const gapMap: Record<string, string> = {
  'none': 'gap-0',
  'sm': 'gap-4',
  'md': 'gap-6',
  'lg': 'gap-8',
  'xl': 'gap-12'
};

export const columnLayoutMap: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-3',
  '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  '1/3-2/3': 'grid-cols-1 md:grid-cols-3',
  '2/3-1/3': 'grid-cols-1 md:grid-cols-3',
  '1/4-3/4': 'grid-cols-1 md:grid-cols-4',
  '3/4-1/4': 'grid-cols-1 md:grid-cols-4'
};

export const colorMap: Record<string, string> = {
  'white': 'bg-white',
  'black': 'bg-black',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
  'gray-800': 'bg-gray-800',
  'gray-900': 'bg-gray-900',
  'blue-50': 'bg-blue-50',
  'blue-600': 'bg-blue-600',
  'blue-800': 'bg-blue-800',
  'cyan-50': 'bg-cyan-50',
  'transparent': 'bg-transparent'
};

export const textColorMap: Record<string, string> = {
  'gray-600': 'text-gray-600',
  'gray-700': 'text-gray-700',
  'gray-800': 'text-gray-800',
  'gray-900': 'text-gray-900',
  'white': 'text-white',
  'blue-600': 'text-blue-600',
  'cyan-500': 'text-cyan-500',
  'cyan-600': 'text-cyan-600'
};