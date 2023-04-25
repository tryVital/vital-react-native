import VitalCore

struct RNTimeSeriesData: Decodable {
  enum TypeKey: String, Decodable {
    case glucose
    case bloodPressure = "blood_pressure"
  }

  enum CodingKeys: String, CodingKey {
    case type
    case samples
  }

  let data: TimeSeriesData

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let type = try container.decode(TypeKey.self, forKey: .type)

    switch type {
    case .bloodPressure:
      let samples = try container.decode([RNBloodPressureSample].self, forKey: .samples)
      data = .bloodPressure(samples.map(\.vitalCoreSample))

    case .glucose:
      let samples = try container.decode([RNQuantitySample].self, forKey: .samples)
      data = .glucose(samples.map(\.vitalCoreSample))
    }
  }
}

struct RNQuantitySample: Decodable {
  let id: String?
  let value: Double
  // JS Date is stringified via `Date.toISOString()` - ISO8601
  let startDate: Date
  let endDate: Date
  let sourceBundle: String?
  let productType: String?
  let type: String?
  let unit: String

  var vitalCoreSample: QuantitySample {
    QuantitySample(
      id: id,
      value: value,
      startDate: startDate,
      endDate: endDate,
      sourceBundle: sourceBundle,
      productType: productType,
      type: type,
      unit: unit,
      metadata: nil
    )
  }
}

struct RNBloodPressureSample: Decodable {
  let systolic: RNQuantitySample
  let diastolic: RNQuantitySample
  let pulse: RNQuantitySample?

  var vitalCoreSample: BloodPressureSample {
    BloodPressureSample(
      systolic: systolic.vitalCoreSample,
      diastolic: diastolic.vitalCoreSample,
      pulse: pulse?.vitalCoreSample
    )
  }
}
