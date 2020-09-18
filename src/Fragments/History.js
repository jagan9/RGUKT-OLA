import React from 'react';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function Renderbid ({bid,i}) {
    return (
            <React.Fragment>
            <TableCell 
            component="th" 
            scope="row" >
            {i}
            </TableCell >
            <TableCell 
            align="left" >
            <Link to={`/users/${bid.id}`}>
            {bid.first_name+' '+bid.last_name}
            </Link>
            </TableCell >
            <TableCell align="left" >
            {bid.email}
            </TableCell >
            <TableCell align="left" >
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(bid.created_at.toDate())))}
            </TableCell >
            <TableCell  align="left">
                {
                    bid.bid_amount
                }
            </TableCell >
            </React.Fragment>
       );
}

class History extends React.Component {

	constructor(props){
        super(props);
        this.state={
         }
        this.i=1; 
    }

	render() {
		let reqBids =this.props.bids?this.props.bids: [] ;

        const list = reqBids.map((bid) => {
            return (
                    <tr key={bid.id}>
                        <Renderbid bid={bid} 
                            i={this.i++}
                        />
                    </tr>
            );
        });
    

		return (
		<div style={{minHeight:"100vh"}} >
			{
                this.props.product===undefined ?
                <div style={{textAlign:"center",
                color:"white"}}> 
                <br/>
                <br/>
                <h2> {'Error 404 : '}    </h2>
                <h2> {'Page Not Found'} </h2>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/>      
                </div>
                :null 
            }

			{
            this.props.product && 
            this.props.product.id === this.props.productId && 
            this.props.bids === null ? 
                <div style={{textAlign:"center",
                color:"white"}}> 
				<br/>
				<br/>
				<h2> {'No Bids yet'}	</h2>
				<h2> {'Wait for user Bid'} </h2>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>		
				</div>
                :null }

		{
            this.props.product &&
			this.props.auth &&
			this.props.bids?(<>
			<h2 
            style={{color:"white",
            textAlign:"center"}} >
            Bid History for 
            <Link to={`/products/${this.props.product.id}`}>
            {this.props.product.name}
            </Link>
            </h2>
			<br/>
            <br/>
            <div 
            style={{margin:"25px",
            textAlign:"center"}}>
    <TableContainer component={Paper}>
      <Table 
      size='small' 
      style={{minWidth:"650px"}} 
      aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S. No()</TableCell>
            <TableCell align="left">
            Name of the Bidder
            </TableCell>
            <TableCell align="left">
            Email
            </TableCell>
            <TableCell align="left">
            Bid Made On
            </TableCell>
            <TableCell align="left">
            Bid Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <br/>
    <br/>
    </>)
    :
    (
	<h1> error</h1>
	)
  }
   </div>
	)
  }
}




export default History;