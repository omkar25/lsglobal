interface ProductFeature {
  id: string;
  title: string;
  value: string;
}

interface ProductFeaturesProps {
  features: ProductFeature[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex justify-between p-4 rounded-lg ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <span className="text-gray-600">{feature.title}</span>
            <span className="font-medium text-gray-900">{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
