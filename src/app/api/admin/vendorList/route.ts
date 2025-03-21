import { NextRequest, NextResponse } from "next/server";

import Vendor from "@/models/vendorModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        // Extract query parameters from the request URL
        const { searchParams } = new URL(request.url);
        const isVerified = searchParams.get("is_verified"); // Get the is_verified query param

        // Build the filter object
        const filter: any = {};
        if (isVerified !== null) {
            filter.isVerified = isVerified === "true"; // Use the correct field name and convert string to boolean
        }

        // Fetch vendors based on the filter
        const vendors = await Vendor.find(filter);
        return NextResponse.json({
            message: "Vendors retrieved successfully",
            data: vendors,
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}



/* Example axios request
import axios from "axios";

const fetchVendors = async (isVerified) => {
    try {
        // Make a GET request to the API with the is_verified query parameter
        const response = await axios.get("http://localhost:3000/api/admin/vendorList", {
            params: {
                is_verified: isVerified, // Pass the query parameter
            },
        });

        // Log the response data
        console.log("Vendors:", response.data);
    } catch (error) {
        console.error("Error fetching vendors:", error.response?.data || error.message);
    }
};

// Example usage
fetchVendors(true); // Fetch vendors where isVerified is true
fetchVendors(false); // Fetch vendors where isVerified is false
*/

//👇👇
//message for frontend guys: fetch the details from above api and display it in the frontend in a table format.
//Also add a filter to filter the vendors based on the isVerified status.   (use the example axios request to fetch the data)
//also provide a button to verify the vendor. (use the below api to verify the vendor)
//also provide a button to delete the vendor. (use the below api to delete the vendor) 