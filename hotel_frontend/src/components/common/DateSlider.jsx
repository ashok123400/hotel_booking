import React, { useState } from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"
import { FaCalendarAlt, FaFilter, FaTimes } from "react-icons/fa"

const DateSlider = ({ onDateChange, onFilterChange }) => {
	const [dateRange, setDateRange] = useState({
		startDate: undefined,
		endDate: undefined,
		key: "selection"
	})

	const handleSelect = (ranges) => {
		setDateRange(ranges.selection)
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
	}

	const handleClearFilter = () => {
		setDateRange({
			startDate: undefined,
			endDate: undefined,
			key: "selection"
		})
		onDateChange(null, null)
		onFilterChange(null, null)
	}

	const formatDate = (date) => {
		if (!date) return "Not selected"
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}

	return (
		<div className="card shadow-sm border-0 mb-4 w-100">
			<div className="card-body p-4">
				{/* Header Section */}
				<div className="d-flex justify-content-between align-items-center mb-4">
					<div className="d-flex align-items-center">
						<FaFilter className="me-3 text-primary fs-5" />
						<h4 className="text-xl font-semibold text-gray-900 mb-0">Filter Bookings by Date Range</h4>
					</div>
					<div className="text-muted fw-medium">
						{dateRange.startDate && dateRange.endDate ? (
							<span className="badge bg-primary bg-opacity-10 text-primary fs-6 p-2">
								{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
							</span>
						) : (
							<span className="text-muted">No date range selected</span>
						)}
					</div>
				</div>

				{/* Date Range Picker - Full Width */}
				<div className="mb-4 w-100">
					<DateRangePicker 
						ranges={[dateRange]} 
						onChange={handleSelect}
						className="w-100"
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						months={2}
						direction="horizontal"
					/>
				</div>

				{/* Action Buttons */}
				<div className="d-flex justify-content-between align-items-center mb-3">
					<div className="text-muted d-flex align-items-center">
						<FaCalendarAlt className="me-2 text-primary" />
						<span className="fw-medium">Select a date range to filter bookings</span>
					</div>
					<div className="d-flex gap-3">
						{dateRange.startDate && dateRange.endDate && (
							<button 
								className="btn btn-outline-danger btn-md d-flex align-items-center px-4 py-2"
								onClick={handleClearFilter}
							>
								<FaTimes className="me-2" />
								Clear Filter
							</button>
						)}
						<button 
							className="btn btn-primary btn-md d-flex align-items-center px-4 py-2"
							onClick={() => {
								if (dateRange.startDate && dateRange.endDate) {
									onDateChange(dateRange.startDate, dateRange.endDate)
									onFilterChange(dateRange.startDate, dateRange.endDate)
								}
							}}
							disabled={!dateRange.startDate || !dateRange.endDate}
						>
							<FaFilter className="me-2" />
							Apply Filter
						</button>
					</div>
				</div>

				{/* Quick Date Filters */}
				<div className="mt-4 pt-4 border-top">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<label className="form-label text-muted fw-semibold mb-0 fs-6">QUICK FILTERS:</label>
						<small className="text-muted">Click to quickly select common date ranges</small>
					</div>
					<div className="d-flex gap-3 flex-wrap">
						<button
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-4 py-2"
							onClick={() => {
								const endDate = new Date()
								const startDate = new Date()
								startDate.setDate(startDate.getDate() - 7)
								setDateRange({
									startDate,
									endDate,
									key: "selection"
								})
							}}
						>
							Last 7 Days
						</button>
						<button
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-4 py-2"
							onClick={() => {
								const endDate = new Date()
								const startDate = new Date()
								startDate.setDate(startDate.getDate() - 30)
								setDateRange({
									startDate,
									endDate,
									key: "selection"
								})
							}}
						>
							Last 30 Days
						</button>
						<button
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-4 py-2"
							onClick={() => {
								const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
								const endDate = new Date()
								setDateRange({
									startDate,
									endDate,
									key: "selection"
								})
							}}
						>
							This Month
						</button>
						<button
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-4 py-2"
							onClick={() => {
								const startDate = new Date(new Date().getFullYear(), 0, 1)
								const endDate = new Date()
								setDateRange({
									startDate,
									endDate,
									key: "selection"
								})
							}}
						>
							Year to Date
						</button>
						<button
							className="btn btn-outline-primary btn-sm d-flex align-items-center px-4 py-2"
							onClick={() => {
								const startDate = new Date()
								const endDate = new Date()
								endDate.setDate(endDate.getDate() + 7)
								setDateRange({
									startDate,
									endDate,
									key: "selection"
								})
							}}
						>
							Next 7 Days
						</button>
					</div>
				</div>
			</div>

			{/* Custom CSS for full-width styling */}
			<style jsx>{`
				.card {
					width: 100% !important;
					max-width: 100% !important;
				}
				.rdrDateRangePickerWrapper {
					width: 100% !important;
				}
				.rdrCalendarWrapper {
					width: 100% !important;
					flex: 1 !important;
				}
				.rdrMonthAndYearWrapper {
					width: 100% !important;
				}
				.rdrMonth {
					width: 100% !important;
				}
				.rdrWeekDays {
					width: 100% !important;
				}
				.rdrDays {
					width: 100% !important;
				}
				.rdrDateDisplayWrapper {
					background-color: transparent;
					width: 100% !important;
				}
				.rdrDateDisplay {
					width: 100% !important;
					margin: 0;
				}
				.rdrDateDisplayItem {
					border-radius: 0.5rem;
					background-color: #f8f9fa;
					border: 2px solid #dee2e6;
					flex: 1;
				}
				.rdrDateDisplayItemActive {
					border-color: #0d6efd;
					background-color: #e7f1ff;
				}
				.rdrDefinedRangesWrapper {
					flex: 0 0 200px !important;
				}
			`}</style>
		</div>
	)
}

export default DateSlider