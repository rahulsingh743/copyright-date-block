/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( {attributes, setAttributes } ) {
	const { showStartingYear, startingYear } = attributes;
	const currentYear = new Date().getFullYear().toString();

	let displayDate;

	if ( showStartingYear && startingYear ) {
		displayDate = `${ startingYear } - ${ currentYear }`;
	} else {
		displayDate = currentYear;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'copyright-date-block') }>
					<ToggleControl
						checked={ !! showStartingYear }
						label={ __(
							'Show Starting Year',
							'copyright-date-block'
						) }
						onChange={ () =>
							setAttributes({
								showStartingYear: !showStartingYear,
							})
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Starting Year',
							'copyright-date-block'
						)}
						value={ startingYear || '' }
						onChange={ (value)  =>
							setAttributes( { startingYear: value } )
						}
						help={ __(
							'Leave empty to use the current year only.',
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>© { displayDate }</p>
		</>
	);
}
